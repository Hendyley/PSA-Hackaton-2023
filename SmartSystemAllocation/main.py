#!/usr/bin/env python
import numpy as np
import sys
from datetime import datetime,timedelta
# Add the directory containing the module to sys.path
#module_path = '\models'
#sys.path.append(module_path)
#print(sys.path)
from QuayModel import Qmodel1
from ContainerModel import Cmodel1, Cmodel2
from flask import Flask, request, jsonify
from constraint import *
import pandas as pd
from faker import Faker

# Initialize the Faker object
faker = Faker()

# Number of rows of dummy data to generate & weight range
num_rows = 100
weight_min = 2
weight_max = 4

random_date = faker.date_this_decade()

# Generate dummy data

containerId = np.arange(1, num_rows + 1)
containerType = np.random.randint(1, 2, num_rows)
zone = np.full(num_rows, 'A')
weights = np.random.randint(weight_min, weight_max + 1, num_rows) * containerType
start_times = [datetime.now() for _ in range(num_rows)]
random_seconds = np.random.randint(0, 86400, num_rows)
random_seconds = [int(sec) for sec in random_seconds]
end_times = [start + timedelta(seconds=secs) for start, secs in zip(start_times, random_seconds)]


# Create a DataFrame from the generated data
df = pd.DataFrame({
    'ContainerId': containerId,
    'ContainerType': containerType,
    'Zone': zone,
    'Weight': weights,
    'StartDate': start_times,
    'EndDate': end_times,
})

#Sort by EndDate
df.sort_values(by='EndDate', inplace=True)

#Group by Date and assign an incremental count within each date group
df['LoadingSequence'] = df.groupby(df['EndDate'].dt.date).cumcount() + 1

print(df)
## ALGO
#id,weight,loadingsequence,datetime
q1 = Qmodel1()
containers = []
Assigned_container = []

for i in range(num_rows):
    if df['ContainerType'][i] == 1:
        container = Cmodel1(df['ContainerId'][i], df['Weight'][i], df['LoadingSequence'][i], df['EndDate'][i])
    else:
        container = Cmodel2(df['ContainerId'][i], df['Weight'][i], df['LoadingSequence'][i], df['EndDate'][i])
    containers.append(container)


quay_width = q1.get_width()
quay_length = q1.get_length()
Max_quay_height = 5


# Create a CSP problem
problem = Problem()

# Define variables (containers) and their domains (positions as matrix coordinates)
positions = [(x, y, z) for z in range(Max_quay_height, -1, -1)  # Start from Max_quay_height and go down to 0
             for y in range(1, quay_length + 1)
             for x in range(1, quay_width + 1)]  # Prioritize (x, y) positions first

# Create a 3D matrix to track occupied positions (initialized as False for all positions)
occupied_positions = [[[False for _ in range(Max_quay_height + 1)] for _ in range(quay_length)] for _ in range(quay_width)]

# Function to check if a container fits in a position
def container_fits(container, position):
    x, y, z = position
    container_width = container.get_width()
    container_length = container.get_length()
    container_height = container.get_height()

    for dx in range(container_width):
        for dy in range(container_length):
            for dz in range(container_height):
                if (x + dx < quay_width and y + dy < quay_length and z + dz <= Max_quay_height):
                    if occupied_positions[x + dx][y + dy][z + dz]:
                        return False  # Container doesn't fit
    return True

# Additional constraint: Ensure the highest z value has the least loading sequence
def loading_sequence_constraint(*positions):
    highest_z = max(position[2] for position in positions)
    loading_sequences = [container.get_loadingsequence() for container, position in zip(containers, positions)]
    return loading_sequences[highest_z] == min(loading_sequences)

# Additional constraint: Prioritize containers with soonest datetime for highest z
def datetime_priority_constraint(*positions):
    highest_z = max(position[2] for position in positions)
    datetime_values = [container.get_datetime() for container, position in zip(containers, positions)]
    return datetime_values[highest_z] == min(datetime_values)

# Additional constraint: Containers must not exceed Max_quay_height when stacked together
def max_height_constraint(*positions):
    total_height = sum(container.get_height() for container, position in zip(containers, positions))
    return total_height <= Max_quay_height

# Additional constraint: Heaviest containers should be at the bottom (lowest z)
def heaviest_at_bottom_constraint(*positions):
    heaviest_container = max(containers, key=lambda container: container.get_weight())
    heaviest_z = min(position[2] for container, position in zip(containers, positions) if container == heaviest_container)
    return all(position[2] >= heaviest_z or container != heaviest_container for container, position in zip(containers, positions))



for var in containers:
    problem.addVariable(var.get_id(), positions)

problem.addConstraint(AllDifferentConstraint())  # Ensure containers don't overlap

# Additional constraint: Containers must not occupy the same position based on their dimensions
for i in range(len(containers)):
    for j in range(i + 1, len(containers)):
        container1 = containers[i]
        container2 = containers[j]

        problem.addConstraint(lambda pos1, pos2, c1=container1, c2=container2:
                              (container_fits(c1, pos1) and container_fits(c2, pos2)) or
                              (container_fits(c1, pos2) and container_fits(c2, pos1)),
                              (container1.get_id(), container2.get_id()))

sol = problem.getSolution()
output = []

if sol:
    best_solution = max(sol.values(), key=lambda x: len(x))
    # Print the best solution
    print("Best container arrangement:")
    for container in containers:
        position = sol[container.get_id()]  # Access the position from the 'sol' dictionary
        x, y, z = position
        occupied_positions[x - 1][y - 1][z] = True  # Mark the position as occupied
        
        container_info = {
        'ContainerId': container.get_id(),
        'Position': position,
        'Weight': container.get_weight(),
        'LoadingDate': container.get_date()
        }

        output.append(container_info)
    sorted_data = sorted(output, key=lambda x: (x["LoadingDate"]))
    
    formatted_outputstr = ""

    for item in sorted_data:
        container_id = item['ContainerId']
        position = item['Position']
        weight = item['Weight']
        loadingdate = item['LoadingDate']
        
    
    # Format the container information and append to the string
        container_info = (
            f"ContainerId: {container_id}, "
            f"Position: {position}, "
            f"Weight: {weight}, "
            f"LoadingDate: {loadingdate} \n "
        )
        formatted_outputstr += container_info

    print(formatted_outputstr)

    # Print occupied positions
    print("\nOccupied Positions:")
    for z in range(Max_quay_height + 1):
        #print(f"Height Level {z}:")
        for x in range(quay_width):
            for y in range(quay_length):
                if occupied_positions[x][y][z]:
                    print(f"Position ({x + 1}, {y + 1}, {z}) is occupied.")
else:
    print("No valid solution found.")

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def processing():
    try:
        if request.method == "POST":
            return jsonify(formatted_outputstr)
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.debug(True)




