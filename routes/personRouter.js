import express from "express";
import personController from "../controllers/personController.js";

const personRouter = express.Router();

personRouter.get("/", personController.getPersons);
personRouter.get("/:id", personController.getPersonByID);
personRouter.post("/", personController.createPerson);
personRouter.put("/:id", personController.updatePerson);
personRouter.delete("/:id", personController.deletePersons);

export default personRouter;
