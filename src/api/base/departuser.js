import request from "@/utils/request";

export function page(data) {
  return request({
    url: "/departUser/getDepartUserList",
    method: "post",
    data
  });
}

export function getDepartRoleList() {
    return request({
      url: "/departUser/getDepartRoleList",
      method: "post"
    });
}
  
export function addDepartUser(data) {
    return request({
      url: "/departUser/addDepartUser",
        method: "post",
      data
    });
}




