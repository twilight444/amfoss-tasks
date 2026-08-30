import psutil
from textual.app import App, ComposeResult
from textual.widgets import Header, Footer, DataTable

class ProcessMonitor(App):
    BINDINGS = [("q", "quit", "Quit")]

    def compose(self) -> ComposeResult:
        yield Header()
        yield DataTable()
        yield Footer()

    def on_mount(self) -> None:
        table = self.query_one(DataTable)
        table.cursor_type = "row"
        table.add_column("PID", key="pid")
        table.add_column("Name", key="name")
        table.add_column("CPU %", key="cpu")
        table.add_column("Memory (MB)", key="mem")
        self.set_interval(0.8, self.update_processes)

    def update_processes(self) -> None:
        table = self.query_one(DataTable)
        seen_pids = set()

        for proc in psutil.process_iter(['pid', 'name', 'memory_info']):
            try:
                pid = str(proc.info['pid'])
                name = proc.info['name']
                cpu = str(int(proc.cpu_percent()))
                mem = str(int(proc.info['memory_info'].rss / (1024 * 1024)))
                seen_pids.add(pid)

                if table.is_valid_row_index(table.get_row_index(pid)):
                    table.update_cell(pid, "cpu", cpu)
                    table.update_cell(pid, "mem", mem)
            except:
                try:
                    table.add_row(pid, name, cpu, mem, key=pid)
                except:
                    continue

        for row_key in list(table.rows.keys()):
            if row_key.value not in seen_pids:
                table.remove_row(row_key)

        self.title = f"Total Active Processes: {len(table.rows)}"

ProcessMonitor().run()
