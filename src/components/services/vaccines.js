import axios from "axios";
class VaccineDataServicesClass {
  async loginUser(requestBody) {
    return axios.post(
      "https://cowinslots.onrender.com/api/v1/login",
      requestBody
    );
  }
  async adminLogin(requestBody) {
    return axios.post(
      "https://cowinslots.onrender.com/api/v1/admin/login",
      requestBody
    );
  }

  userSignup(obj) {
    return axios.post(
      "https://cowinslots.onrender.com/api/v1/user/signup",
      obj
    );
  }
  adminSignup(obj) {
    return axios.post(
      "https://cowinslots.onrender.com/api/v1/admin/signup",
      obj
    );
  }
  getAllCenter(page = 0) {
    return axios.get(
      `https://cowinslots.onrender.com/api/v1/center/?page=${page}`
    );
  }
  get(id) {
    return axios.get(`https://cowinslots.onrender.com/api/v1/center/${id}`);
  }

  find(query) {
    return axios.get(
      `https://cowinslots.onrender.com/api/v1/center/?city=${query}`
    );
  }

  getSlots(obj) {
    return axios.post("https://cowinslots.onrender.com/api/v1/slots/find", obj);
  }
  addSlots(requestBody) {
    return axios.post(
      "https://cowinslots.onrender.com/api/v1/slots",
      requestBody
    );
  }
  addCenter(centerData) {
    return axios.post(
      "https://cowinslots.onrender.com/api/v1/center/",
      centerData
    );
  }
  deleteCenter(deleteobj) {
    return axios.delete("https://cowinslots.onrender.com/api/v1/center/", {
      data: { _id: deleteobj._id },
    });
  }
}
const VaccineDataServices = new VaccineDataServicesClass();
export default VaccineDataServices;
