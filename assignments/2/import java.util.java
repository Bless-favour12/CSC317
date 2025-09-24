import java.util.*;

/** Domain model for a task. */
class Task {
    int id;
    String name;
    int priority; // 1 = highest priority

    public Task(int id, String name, int priority) {
        this.id = id;
        this.name = name;
        this.priority = priority;
    }

    public void displayTaskDetails() {
        System.out.println("Task ID: " + id + ", Name: \"" + name + "\", Priority: " + priority);
    }
}

/** Orchestrates input, processing order, and history. */
class TaskManager {
    private final List<Task> tasksArray = new ArrayList<>();
    private final Queue<Task> taskQueue = new LinkedList<>();
    private final Stack<Task> completedTasks = new Stack<>();
    private final LinkedList<Task> highPriorityTasks = new LinkedList<>();

    /** Read tasks from console and place into structures. */
    public void inputTasks() {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Enter the number of tasks: ");
        int numTasks = readInt(scanner);

        for (int i = 0; i < numTasks; i++) {
            System.out.println("\nTask " + (i + 1));
            System.out.print("Enter task ID: ");
            int id = readInt(scanner);

            System.out.print("Enter task name: ");
            String name = scanner.nextLine().trim();
            while (name.isEmpty()) {
                System.out.print("Name cannot be empty. Enter task name: ");
                name = scanner.nextLine().trim();
            }

            System.out.print("Enter task priority (1-5, 1 = highest): ");
            int priority = readInt(scanner);
            while (priority < 1 || priority > 5) {
                System.out.print("Please enter a priority from 1 to 5: ");
                priority = readInt(scanner);
            }

            Task task = new Task(id, name, priority);
            tasksArray.add(task);

            if (priority == 1) {
                highPriorityTasks.add(task);     // front-load highest priority
            } else {
                taskQueue.add(task);             // normal queue for others
            }
        }
    }

    /** Display all collected tasks. */
    public void displayTasks() {
        System.out.println("\nList of All Tasks:");
        for (Task task : tasksArray) {
            task.displayTaskDetails();
        }
    }

    /** Process tasks: priority 1 first, then FIFO for the rest. */
    public void processTasks() {
        System.out.println("\nProcessing Tasks (Priority 1 handled first):");

        while (!highPriorityTasks.isEmpty()) {
            Task high = highPriorityTasks.removeFirst();
            System.out.println("Processed Task: " + high.name);
            completedTasks.push(high);
        }

        while (!taskQueue.isEmpty()) {
            Task next = taskQueue.poll();
            System.out.println("Processed Task: " + next.name);
            completedTasks.push(next);
        }
    }

    /** Show completion history in most-recent-first order. */
    public void displayTaskHistory() {
        System.out.println("\nTask History (Most Recent First):");
        while (!completedTasks.isEmpty()) {
            Task done = completedTasks.pop();
            done.displayTaskDetails();
        }
    }

    /** Full simulation pipeline. */
    public void simulateTaskManager() {
        inputTasks();
        displayTasks();
        processTasks();
        displayTaskHistory();
    }

    /** Safe integer read helper (eats bad input, keeps asking). */
    private int readInt(Scanner sc) {
        while (!sc.hasNextInt()) {
            sc.nextLine();
            System.out.print("Please enter a valid integer: ");
        }
        int val = sc.nextInt();
        sc.nextLine(); // consume newline
        return val;
    }
}
