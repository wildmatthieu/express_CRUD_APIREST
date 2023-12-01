const supertest = require("supertest");
const { server, serverListener } = require("../server");

const request = supertest(server);

describe("POST /transactions", () => {
  it("should create two transactions", async () => {
    const response1 = await request.post("/transactions").send({
      client_sender: 1,
      client_receiver: 2,
      amount: 100,
      date: "2023-01-01",
      comment: "Test transaction 1",
    });
    expect(response1.status).toBe(200);

    const response2 = await request.post("/transactions").send({
      client_sender: 14,
      client_receiver: 37,
      amount: 45000,
      date: "2023-05-20"
    }); // pas de commentaire pour cette transaction lors de sa création
    expect(response2.status).toBe(200);
  });

  it("should return 400 for invalid transaction amount", async () => {
    const response = await request.post("/transactions").send({
      client_sender: 1,
      client_receiver: 2,
      amount: -50, // Invalid amount
      date: "2023-01-01",
      comment: "Test transaction",
    });

    expect(response.status).toBe(400);
  });
});

describe("GET /transactions", () => {
  it("should get all transactions", async () => {
    const response = await request.get("/transactions");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(2);
  });
});

describe("GET /transactions/:id", () => {
  it("should get a specific transaction by ID", async () => {
    // première transaction créée dans le test du POST plus haut
    const response1 = await request.get("/transactions/1");
    expect(response1.status).toBe(200);
    expect(response1.body).toBeDefined();
    expect(response1.body.id).toBe(1);

    // deuxième transaction créée dans le test du POST plus haut
    const response2 = await request.get("/transactions/2");
    expect(response2.status).toBe(200);
    expect(response2.body).toBeDefined();
    expect(response2.body.id).toBe(2);
  });

  it("should return 400 for invalid transaction ID", async () => {
    const response = await request.get("/transactions/invalidID");
    expect(response.status).toBe(400);
  });
});

describe("DELETE /transactions/:id", () => {
  it("should delete a specific transaction by ID", async () => {
     // première transaction créée dans le test du POST plus haut
     const response1 = await request.delete("/transactions/1");
    expect(response1.status).toBe(200);

    // deuxième transaction créée dans le test du POST plus haut
    const response2 = await request.delete("/transactions/2");
    expect(response2.status).toBe(200);

    // on vérifie si la route "/transactions" en GET ne renvoie plus aucune transaction
    const response3 = await request.get("/transactions");
    expect(response3.status).toBe(200);
    expect(Array.isArray(response3.body)).toBe(true);
    expect(response3.body.length).toBe(0);
  });

  it("should return 400 for invalid transaction ID", async () => {
    const response = await request.delete("/transactions/invalidID");
    expect(response.status).toBe(400);
  });
});

// On stope proprement le serveur une fois que tous les tests se sont écoulés
afterAll(async () => {
  return new Promise((resolve) => {
    serverListener.close(() => {
      resolve();
    });
  });
});
