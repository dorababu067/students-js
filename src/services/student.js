import axios from "../components/axios";

class StudentService {
  async create(payload) {
    try {
      const response = await axios.post("/schools/", payload);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async list(id) {
    try {
      const response = await axios.get(`/schools/${id}/students/`);
      return response;
    } catch (error) {
      throw error.response.data;
    }
  }

  async update() {
    return "update school";
  }

  async delete() {
    return "delete school";
  }
}

const studentService = new StudentService();

export default studentService;
