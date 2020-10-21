import request from "@/utils/request";

export function page(data) {
  return request({
    url: "/SysDepartment/allPageQuery",
    method: "post",
    data,
  });
}

export function addOrUpdateDepart(data) {
  return request({
    url: "/SysDepartment/createOrUpdateDepart",
    method: "post",
    data,
  });
}

export function getDepartment(id) {
  return request({
    url: "/SysDepartment/getDepartment/" + id,
    method: "get",
  });
}

export function deleteDepart(data) {
  return request({
    url: "/SysDepartment/deleteDepart",
    method: "post",
    data
  });
}

export function departList(data) {
  return request({
    url: "/SysDepartment/departList",
    method: "post",
    data
  });
}