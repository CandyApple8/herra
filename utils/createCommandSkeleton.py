import os
import random 

with open("skeletonCommandData.txt", "r+") as f:
    with open(f"commands/newCommand{random.randrange(100, 10000)}.js", "w+") as n:
        n.write(f.read())
        n.close()

print("New command created :)")    