import requests
import os
import json
import re
import pandas as pd

resp = requests.post("https://triggerproc-cytkfcb3vq-as.a.run.app")
output_string = resp.json()
rows = output_string.split('\n')

# Step 2: Split each row into columns based on commas and extract relevant information
data = []
for row in rows:
    match = re.findall(r'(\w+):\s+([^,]+)', row)
    info = {key: val.strip() if key != 'Position' else tuple(map(int, val.strip('()').split(','))) for key, val in match}
    data.append(info)

# Step 3: Create a pandas DataFrame
df = pd.DataFrame(data)

# Step 4: Convert the DataFrame to a JSON object
json_output = df.to_json(orient='records')

# Print the JSON object
print(json_output)
