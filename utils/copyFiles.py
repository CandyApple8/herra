import shutil
import glob 
import os
from pathlib import Path

mainDir = os.chdir(os.getcwd())

for file in glob.glob("*"):
    