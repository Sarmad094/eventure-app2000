const users = [
    { id: 1, email: "test@student.com", password: "password123", name: "Test Student" },
    { id: 2, email: "company@example.com", password: "secure123", name: "Example Company" },
  ];
  

  export const login = async (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Invalid credentials");
    }
    return { id: user.id, name: user.name, email: user.email };
  };
  
 
  export const register = async (email, password, name) => {
    const userExists = users.some((u) => u.email === email);
    if (userExists) {
      throw new Error("User already exists");
    }
    const newUser = { id: users.length + 1, email, password, name };
    users.push(newUser);
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  };
  