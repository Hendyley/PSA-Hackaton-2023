import requests
import os
import json
import re

resp = requests.post("https://triggerproc-cytkfcb3vq-as.a.run.app")



file_path = '../src/Result/output.txt'
with open(file_path, 'w') as file:
    json.dump(resp.json(), file)


# Initialize an empty list to store data dictionaries
data_list = []


# Read the text file
with open(file_path, 'r') as file:
    # Split the text by newline characters to separate each container's data
    containers = file.read().strip().split('\n')

    # Process each container's data
    for container_data in containers:
        # Split the data into key-value pairs using commas
        key_value_pairs = container_data.strip().split(', ')

        # Initialize a dictionary to store the container's data
        container_dict = {}

        # Process each key-value pair
        for key_value in key_value_pairs:
            # Split each key-value pair into key and value using ":"
            key_value_split = key_value.split(': ')
            if len(key_value_split) == 2:
                key, value = key_value_split
                # Store the key-value pair in the dictionary
                container_dict[key] = value

        # Append the container's dictionary to the list
        data_list.append(container_dict)

# Specify the output JSON file path
output_json_file_path = '../src/Result/output.json'

# Save the data as a JSON file
with open(output_json_file_path, 'w') as json_file:
    json.dump(data_list, json_file, indent=4)

#print(f'JSON data saved to {output_json_file_path}')
