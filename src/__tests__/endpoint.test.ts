import supertest from "supertest";
import { app } from "..";

const employeeInfo = {
  employeeName: "mocked_name",
};

describe("test request endpoint", () => {
  it("shoud be login auth", async () => {
    const { statusCode, body } = await supertest(app)
      .post("/login")
      .send(employeeInfo);
    expect(statusCode).toBe(200);
    expect(body.employeeName).toEqual("mocked_name");
  });

  it("should create a token successfully", async () => {
    const mockToken: { token: string } = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVmluY2VudCBEaWFvIiwiaWF0IjoxNjcxMDk3MTExfQ.o6W-ERcMEkBpGcdTzcg44PeUVauQSmYziNThf1zqx30",
    };
    const { statusCode } = await supertest(app).post("/token").send(mockToken);
    expect(statusCode).toBe(200);
  });

  it("should create a null token", async () => {
    const mockToken: { token: string | null | undefined } = {
      token: null,
    };
    const { statusCode } = await supertest(app).post("/token").send(mockToken);
    expect(statusCode).toBe(401);
  });

  it("should create a undefined token", async () => {
    const mockToken: { token: string | null | undefined } = {
      token: undefined,
    };
    const { statusCode } = await supertest(app).post("/token").send(mockToken);
    expect(statusCode).toBe(401);
  });

  it("create an employee", async () => {
    const mockEmployee = {
      name: "mocked_employee",
      age: 27,
    };

    const { statusCode, body } = await supertest(app)
      .post("/createemployees")
      .send(mockEmployee);
    expect(statusCode).toBe(200);
    expect(body).toEqual({ succ: "OK" });
  });

  it("get a specific employee", async () => {
    const requiredEmployee = { id: 3 };
    const { statusCode, body } = await supertest(app)
      .post("/employee/:id")
      .send(requiredEmployee);
    expect(statusCode).toBe(200);
    expect(body.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: body.rows[0].id,
        }),
      ])
    );
  });

  it("get all employees", async () => {
    const { statusCode, body } = await supertest(app).get("/employees");
    expect(statusCode).toBe(200);
    expect(body.rows).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: "mocked_employee",
        }),
      ])
    );
  });
});
