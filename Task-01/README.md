# APPROACH

**LEVEL-1**

* Updated the system package lists and installed Git using `sudo apt update && sudo apt install -y git`.
* Cloned the challenge repository to my PC using `git clone`.
* Navigated through the folders and listed files in each sector of the Loguetown Reef directory.
* Located the `devilfruit.txt` file along with the executable script `eat.sh`.
* Executed `./eat.sh` in the terminal and obtained the awakening signature.

**LEVEL-2**

* Spent time searching the directories for clues before discovering that different branches existed.
* Used `git branch -a` to view all branches and switched to `whiskey_peak_investigation` using `git checkout whiskey_peak_investigation`.
* Located the hidden `.baroque_works_cache/` directory using `ls -al` and found the script `unlock_vault.sh`.
* Attempted to run the script and encountered an environmental scan error prompting for `AWAKENING_SIGNATURE`.
* Learned about environment variables and exported the signature using `export AWAKENING_SIGNATURE="ONE_PIECE{GITO_GITO_NO_AWAKENING}"`.
* Ran `./unlock_vault.sh` to decrypt the streams, which generated `marine_intercept.log` and `bounty_hunter_feed.log`.
* Compared both files using `diff marine_intercept.log bounty_hunter_feed.log` to retrieve the executive transmission code.

**LEVEL-3**

* Switched to the target branch using `git switch little_garden`.
* Navigated into `Wax_Jungle/` and discovered multiple nested sector directories and logs.
* Used `find . -name "*.log" -exec grep "" {} +` to list all `.log` file paths and their contents simultaneously.
* Scrolled through the outputs and located the cipher fragment inside `agent_manifest.log`.
* Navigated to `sector_beta/outpost/watchtower/storage/archive/`.
* Displayed `agent_manifest.log` using `cat` and extracted `PONEGLYPH_FRAGMENT_I`.

**LEVEL-4**

* Switched back to the `canonical-timeline` branch and navigated into `Water_7/galley_la_company`.
* Inspected `puffing_tom_blueprints` using the `file` command after failing to open it, discovering it was a disguised `gzip` compressed tar archive.
* Renamed the file to `puffing_tom_blueprints.tar.gz` using `mv`.
* Extracted the archive using `tar -xvf puffing_tom_blueprints.tar.gz`, which yielded `step1_blueprints.zip`.
* Unzipped `step1_blueprints.zip` to extract the `blueprints_extracted` folder.
* Navigated inside and used `cat secret_link.txt` to retrieve `PONEGLYPH_FRAGMENT_II`.

**LEVEL-5**

* Switched to the `alternate_timeline` branch and navigated into `GrandLine/Enies_Lobby`.
* Found the hidden directory `.cp9_secure_vault` and located `poneglyph.py`.
* Executed the script using `python3 poneglyph.py` and entered Fragment I first, which returned a base64 padding error.
* Combined both fragments (`PONEGLYPH_FRAGMENT_I` + `PONEGLYPH_FRAGMENT_II`) as the input, successfully deciphered the script, and retrieved the repository URL.
* Explored `vault_3/` and tested `decode.sh` with `chmod +x` and execution, discovering it was just an intruder alert decoy.
* Tested the decrypted URL, found it was broken/contained a typo, reached out to my mentor to get the corrected link, and proceeded to Level 6.

**LEVEL-6**

* Cloned the `Laugh-Tale-Merge-War` repository to my PC using `git clone`.
* Navigated into `treasure/` and read `key_part_1.txt` (Fragment α: "TheGrand") and `key_part_2.txt` (Fragment β: "Remem").
* Checked for other branches, switched to the alternate branch, and inspected `key_part_1.txt` (Fragment α: "Line") and `key_part_2.txt` (Fragment β: "bers").
* Combined the matching fragments (α + α and β + β) to form the password `TheGrandLineRemembers`.
* Executed `./victory.sh`, entered the password, resolved the timeline integrity, and unlocked the final flag `FLAG{The_Grand_Line_Remembers_Your_Commit}`.

# COMMANDS LEARNED

*Ubuntu Terminal*

`sudo apt update && sudo apt install -y git`: Updates package lists and installs Git.

`touch`: Creates new empty files.

`mkdir`: Creates new directories.

`cat`: Outputs the contents of a file.

`cd`: Changes the current working directory.

`pwd`: Displays the present working directory.

`ls`: Lists files and folders in the current directory.

`ls -al`: Lists all files, including hidden files and detailed permissions.

`mv <source> <destination>`: Moves or renames files and directories.

`chmod +x <file>`: Grants executable permissions to a file.

`./<script.sh>`: Executes a shell script directly from the terminal.

`export <KEY>=<VALUE>`: Sets an environment variable for the current terminal session.

`echo $<KEY>`: Reads and displays the value stored in an environment variable.

`printenv`: Displays all active environment variables.

`diff <file1> <file2>`: Compares two files line by line and highlights the differences.

`find <path> -name "<pattern>"`: Searches for files matching a pattern within a directory tree.

`grep "<pattern>" <file>`: Searches for matching patterns inside files.

`find . -name "*.log" -exec grep "" {} +`: Finds all `.log` files in the directory and prints their contents along with their file paths.

`file <filename>`: Determines and displays the actual file type.

`tar -xvf <archive.tar.gz>`: Extracts contents from a tar archive.

`unzip <archive.zip>`: Extracts files from a ZIP archive.

`python3 <filename.py>`: Executes a Python 3 script.

*Git*

`git clone <url>`: Clones the repository from the specified URL to the local system.

`git branch -a`: Lists all local and remote branches in the repository.

`git checkout <branch_name>`: Switches to the specified branch.

`git switch <branch_name>`: Switches to the specified branch.
