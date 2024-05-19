class MaqeBot {
  private x: number;
  private y: number;
  private direction: string;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = "North";
  }

  public executeCommands(commands: string): void {
    const commandPattern = /[RL]|W\d+/g;
    const commandArray = commands.match(commandPattern);

    if (commandArray) {
      for (let command of commandArray) {
        this.processCommand(command);
      }
    }

    console.log(`X: ${this.x} Y: ${this.y} Direction: ${this.direction}`);
  }

  private processCommand(command: string): void {
    switch (command) {
      case "R":
        this.turnRight();
        break;
      case "L":
        this.turnLeft();
        break;
      default:
        if (command.startsWith("W")) {
          const distance = parseInt(command.substring(1), 10);
          this.walk(distance);
        }
        break;
    }
  }

  private turnRight(): void {
    switch (this.direction) {
      case "North":
        this.direction = "East";
        break;
      case "East":
        this.direction = "South";
        break;
      case "South":
        this.direction = "West";
        break;
      case "West":
        this.direction = "North";
        break;
    }
  }

  private turnLeft(): void {
    switch (this.direction) {
      case "North":
        this.direction = "West";
        break;
      case "West":
        this.direction = "South";
        break;
      case "South":
        this.direction = "East";
        break;
      case "East":
        this.direction = "North";
        break;
    }
  }

  private walk(distance: number): void {
    switch (this.direction) {
      case "North":
        this.y += distance;
        break;
      case "East":
        this.x += distance;
        break;
      case "South":
        this.y -= distance;
        break;
      case "West":
        this.x -= distance;
        break;
    }
  }
}

const commandString = process.argv[2];
if (commandString) {
  const maqeBot = new MaqeBot();
  maqeBot.executeCommands(commandString);
} else {
  console.error("Please provide a command string.");
}
