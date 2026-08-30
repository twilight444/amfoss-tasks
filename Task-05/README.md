## Approach

The project is split into two main parts: reading the system data and displaying it cleanly on the screen.

First, I used the `psutil` library to collect live data from the operating system. Every 0.8 seconds, the program loops through all running processes and grabs their PID, program name, CPU usage percent, and memory footprint. I converted the raw memory numbers into MB and kept both CPU and memory as whole numbers so the table looks good.

Then, I used the `Textual` library to build the interactive UI. Instead of wiping and redrawing the whole screen on every update, which causes screen flickering and constantly resets your scroll view, the program assigns each process its PID as a unique row key. It updates the numbers directly inside their existing cells in real time.

If a new process opens, it gets added as a new row. If an old process closes, it gets removed automatically. This design eliminates screen flickering and lets you scroll up and down through all active processes with your arrow keys.


## CONCEPTS LEARNED

### Process Metrics (`psutil`)

`psutil.process_iter()`: Loops through all running system tasks and fetches only the selected fields (`pid`, `name`, `memory_info`) in one lightweight pass.

`proc.cpu_percent()`: Calculates the active CPU usage percentage of a process over the 0.8-second time gap.

`memory_info.rss`: Reads the Resident Set Size (RSS), which is the actual physical RAM currently occupied by a process.

### Terminal UI & Architecture (`Textual`)

`App & ComposeResult`: Defines the base terminal application and declares how widgets are structured on screen.

`compose() & yield`: Uses Python generator syntax to create and place the UI components (`Header`, `DataTable`, `Footer`) in vertical order.

`on_mount()`: An automatic startup function that runs once the screen loads to set up table columns and start background timers.

`self.set_interval()`: Runs a repeating background timer to refresh data every 0.8 seconds without freezing keyboard controls.

`DataTable`: A built-in terminal table widget that handles column spacing and keyboard scrolling out of the box.

`table.cursor_type = "row"`: Changes table selection so arrow keys highlight entire rows instead of single cells.

`In-Place Cell Updates (update_cell)`: Modifies existing table cells using row and column keys, eliminating full-screen redraws and screen flickering.

`Dynamic Row Lifecycle (add_row / remove_row)`: Automatically tracks live processes to add newly opened programs and remove closed ones dynamically.

`BINDINGS`: Maps keyboard keys (such as `q`) to built-in actions (`quit`) and displays them in the bottom footer.

`Exception Handling (try / except)`: Prevents crashes when background processes suddenly close in the middle of being read.
