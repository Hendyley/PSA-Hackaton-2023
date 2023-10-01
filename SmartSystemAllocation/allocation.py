#!/usr/bin/env python
import random
import sys

# Add the directory containing the module to sys.path
#module_path = '\models'
#sys.path.append(module_path)
#print(sys.path)
from QuayModel import Qmodel1
from ContainerModel import Cmodel1, Cmodel2

from constraint import *


# Create a CSP problem
problem = Problem()

# Define variables and their domains
variables = ["A", "B", "C"]
domain = [1, 2, 3]

for var in variables:
    problem.addVariable(var, domain)

# Define constraints
def constraint_function(a, b):
    return a + b <= 5

problem.addConstraint(AllDifferentConstraint())  # Ensure all variables have different values
problem.addConstraint(constraint_function, ("A", "B"))  # Custom constraint: A + B <= 5

# Solve the CSP
solutions = problem.getSolutions()

# Print the solutions
for solution in solutions:
    print("Solution:")
    for var in variables:
        print(f"{var}: {solution[var]}")
    print("\n")

q1 = Qmodel1()
c1 = Cmodel1(9,99)


print(c1.get_weight())
print(c1.get_loadingsequence())