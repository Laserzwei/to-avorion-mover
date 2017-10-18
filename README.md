An atom packages to deploy the files from your working project into the Avorion folder.
This removes annoying filehandling before testing your newly made changes.
Needs manual activation (e.g via hotkey or contextmenu).

change:

avorionSteam: "E:\\Program Files (x86)\\Steam\\steamapps\\common\\Avorion"

foldersToCopy option: ["mods", "data"]

in /lib/to-avorion-mover.js to your needs.

Be warned: It will overwrite any duplicte files without asking.

TODO make avorionSteam and foldersToCopy a config option.
