const organizations = [
    { id: 1, orgId: "company123", password: "secure123", name: "Example Company", type: "organization" },
  ];
  
  export const orgLogin = async (orgId, password) => {
    const organization = organizations.find((o) => o.orgId === orgId && o.password === password);
    
    if (!organization) {
      throw new Error("Invalid credentials");
    }
  
    return { id: organization.id, name: organization.name, type: organization.type };
  };
  
  export const orgRegister = async (orgId, password, name) => {
    const orgExists = organizations.some((o) => o.orgId === orgId);
  
    if (orgExists) {
      throw new Error("Organization ID is already in use");
    }
  
    const newOrg = {
      id: organizations.length + 1,
      orgId,
      password,
      name,
      type: "organization",
    };
  
    // Add organization to the "database" (list of organizations)
    organizations.push(newOrg);
  
    return { id: newOrg.id, name: newOrg.name, type: newOrg.type };
  };
  
  export const getOrgById = (id) => {
    return organizations.find((o) => o.id === id);
  };
  
  export const deleteOrg = (id) => {
    const index = organizations.findIndex((o) => o.id === id);
    if (index !== -1) {
      organizations.splice(index, 1);  // Removes organization from the array
      return true;
    }
    return false;
  };
  
  export const updateOrg = (id, updatedData) => {
    const organization = organizations.find((o) => o.id === id);
    if (!organization) return null;
  
    Object.assign(organization, updatedData);  // Updates organization info
    return organization;
  };
  