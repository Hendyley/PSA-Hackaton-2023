#!/usr/bin/env python
import random
import sys
import datetime
# Add the directory containing the module to sys.path
#module_path = '\models'
#sys.path.append(module_path)
#print(sys.path)
from QuayModel import Qmodel1
from ContainerModel import Cmodel1, Cmodel2

from constraint import *


q1 = Qmodel1()
c1 = Cmodel1('c1',9,1,'2022-01-01')
c2 = Cmodel2('c2',6,3,'2022-01-01')
c3 = Cmodel1('c3',5,4,'2022-01-01')


containers = []
Assigned_container = []

quay_width = q1.get_width()
quay_length = q1.get_length()
Max_quay_height = 6

containers.append(c1)
containers.append(c2)
containers.append(c3)

# Create a CSP problem
problem = Problem()
print(c1.get_weight())
print(c1.get_loadingsequence())


# # Define variables (containers) and their domains (positions as matrix coordinates)
# positions = [(x, y) for x in range(1, quay_width + 1)
#              for y in range(1, quay_length + 1)]

# Define variables (containers) and their domains (positions as matrix coordinates)
positions = [(x, y) for x in range(1, q1.get_width() + 1)
             for y in range(1, q1.get_length() + 1)]
             #for orientation in ["horizontal", "vertical"]]

# Create a 3D matrix to track occupied positions (initialized as False for all positions)
occupied_positions = [[False  for _ in range(q1.get_width())] for _ in range(q1.get_length())]
# for position in positions:
#     print(position)

# for container in containers:
#     print(container.get_id())


# Function to check if a container fits in a position
def container_fits(container, position):
    x, y = position
    container_width = container.get_width()
    container_length = container.get_length()

    for dx in range(container_width):
        for dy in range(container_length):
                if (x + dx < q1.get_width() and y + dy < q1.get_length()):
                    if occupied_positions[x + dx][y + dy]:
                        return False  # Container doesn't fit
    return True

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

if sol:
    best_solution = max(sol, key=len)
    # Print the best solution
    print("Best container arrangement:")
    for container in containers:
        position = sol[container.get_id()]  # Access the position from the 'sol' dictionary
        x, y = position
        #occupied_positions[x - 1][y - 1][z - 1] = True  # Mark the position as occupied
        print(f"{container.get_id()}: Position {position}, Length: {container.get_length()}, Width: {container.get_width()}, Height: {container.get_height()}, Weight: {container.get_weight()}, Loading Sequence: {container.get_loadingsequence()}")
    else:
        print("No valid solution found.")

# for position in positions:
#     print(position)

# for container in containers:
#     print(container.get_id())

