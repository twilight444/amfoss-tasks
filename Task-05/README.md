## Approach

The project is split into two main parts: reading the system data and displaying it cleanly on the screen.

First, I used the `psutil` library to collect live data from the operating system. Every 0.8 seconds, the program loops through all running processes and grabs their PID, program name, CPU usage percent, and memory footprint. I converted the raw memory numbers into MB and kept both CPU and memory as whole numbers so the table looks good.

Then, I used the `Textual` library to build the interactive UI. Instead of wiping and redrawing the whole screen on every update, which causes screen flickering and constantly resets your scroll view, the program assigns each process its PID as a unique row key. It updates the numbers directly inside their existing cells in real time.

If a new process opens, it gets added as a new row. If an old process closes, it gets removed automatically. This design eliminates screen flickering and lets you scroll up and down through all active processes with your arrow keys.
