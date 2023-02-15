let nameInp = document.querySelector(".name-input");
let emailInp = document.querySelector(".email-input");
let imageURLInp = document.querySelector(".imageURL-input");
let phoneInp = document.querySelector(".phone-input");
let save = document.querySelector(".save_btn");
let remove = document.querySelector(".remove_btn");
let cardInfo = document.querySelector("#container");

save.addEventListener("click", () => {
  if (
    !nameInp.value.trim() ||
    !emailInp.value.trim() ||
    !imageURLInp.value.trim() ||
    !phoneInp.value.trim()
  ) {
    alert("Complete all form");
    return;
  }
  let infoObj = {
    name: nameInp.value,
    email: emailInp.value,
    image_url: imageURLInp.value,
    phone_number: phoneInp.value,
  };
  creatElement(infoObj);
  readElement();
});

remove.addEventListener("click", () => {
  nameInp.value = "";
  emailInp.value = "";
  imageURLInp.value = "";
  phoneInp.value = "";
});

function creatElement(info) {
  if (!localStorage.getItem("info-data")) {
    localStorage.setItem("info-data", "[]");
  }
  let data = JSON.parse(localStorage.getItem("info-data"));
  data.push(info);
  localStorage.setItem("info-data", JSON.stringify(data));
}

function readElement() {
  let newData = JSON.parse(localStorage.getItem("info-data"));
  cardInfo.innerHTML = "";
  if (newData !== null) {
    newData.forEach((element, index) => {
      let card = document.createElement("div");
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
      <div class="card-body">
      <img src=${element.image_url} class="card-img-top" alt="...">
        <h5 class="card-title">${element.name}</h5>
        <h6 class="card-title">${element.email}</h6>
        <a href="#" class="btn bg-primary-subtle border border-primary-subtle rounded 3">${element.phone_number}</a>
      </div>
      </div>`;
      let btnDelete = document.createElement("button");
      let btnUpdate = document.createElement("button");
      btnDelete.innerText = "delete";
      btnUpdate.innerText = "update";
      btnDelete.setAttribute("class", "delete_btn");
      btnUpdate.setAttribute("class", "upDate_btn");
      btnDelete.setAttribute("id", index);
      btnUpdate.setAttribute("id", index);
      btnDelete.addEventListener("click", () => {
        deleteElement(index);
      });
      btnUpdate.addEventListener("click", () => {
        upDateElement(index);
      });
      card.append(btnDelete);
      card.append(btnUpdate);
      cardInfo.append(card);
    });
  }
}
readElement();

function deleteElement(index) {
  let data = JSON.parse(localStorage.getItem("info-data"));
  data.splice(index, 1);
  localStorage.setItem("info-data", JSON.stringify(data));
  readElement();
}

let mainModal = document.querySelector(".main-modal");
let inpName = document.querySelector(".inp-name");
let inpEmail = document.querySelector(".inp-email");
let inpImage = document.querySelector(".inp-imageURL");
let inpPhone = document.querySelector(".inp-phone");
let btnCloser = document.querySelector(".btn-closer");
let btnSave = document.querySelector(".btn-save");

function setScrollIntoView(top) {
  mainModal.scrollIntoView(top);
}
function upDateElement(index) {
  mainModal.style.display = "block";
  setScrollIntoView();
  let data = JSON.parse(localStorage.getItem("info-data"));
  inpName.value = data[index].name;
  inpEmail.value = data[index].email;
  inpImage.value = data[index].image_url;
  inpPhone.value = data[index].phone_number;
  inpName.setAttribute("id", index);
  inpEmail.setAttribute("id", index);
  inpImage.setAttribute("id", index);
  inpPhone.setAttribute("id", index);
}
btnCloser.addEventListener("click", () => {
  mainModal.style.display = "none";
});

btnSave.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("info-data"));

  let index = inpName.id;
  console.log(index);
  if (
    !inpName.value.trim() ||
    !inpEmail.value.trim() ||
    !inpImage.value.trim() ||
    !inpPhone.value.trim()
  ) {
    alert("Fill form!");
    return;
  }
  let upDateInfo = {
    name: inpName.value,
    email: inpEmail.value,
    image_url: inpImage.value,
    phone_number: inpPhone.value,
  };
  data.splice(index, 1, upDateInfo);
  localStorage.setItem("info-data", JSON.stringify(data));
  mainModal.style.display = "none";
  readElement();
});
