import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user"; 

class Task extends Model {
  public id!: string;
  public title!: string;
  public description!: string | null;
  public dueDate!: Date | null;
  public status!: "pending" | "in-progress" | "completed";
  public userId!: string; 

  // Association method for TypeScript
  public static associate: (models: any) => void;
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      defaultValue: "pending",
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'Users',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    tableName: "tasks",
  }
);

// Define association
Task.associate = (models) => {
  Task.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
  });
};

export default Task;
