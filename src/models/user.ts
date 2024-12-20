import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../config/database";
import Task from "./task"; 

class User extends Model {
  public id!: string;
  public email!: string;
  public password!: string;
  public name!: string | null;
  public role!: "admin" | "user";

  // Association method for TypeScript
  public static associate: (models: any) => void;
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 255],
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("admin", "user"),
      defaultValue: "user",
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

// Hash password before saving
User.beforeSave(async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
});

// Define association
User.associate = (models) => {
  User.hasMany(models.Task, {
    foreignKey: "userId",
    as: "tasks",
  });
};

export default User;
