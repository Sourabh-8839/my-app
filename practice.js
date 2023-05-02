
const form = document.querySelector("#my-form");

const msg = document.querySelector('.msg');

const inputName = document.querySelector('#name');

const emailId = document.querySelector('#email');

const phone = document.querySelector('#phone');

const userList = document.querySelector('#users');

const axiosInstance = axios.create({ baseURL: 'https://crudcrud.com/api/6b4c772d44564f08866929b36aab97f6' })





form.addEventListener('submit', onSubmit);

window.addEventListener('DOMContentLoaded',()=>{
    axiosInstance.get('/appoinmentData')
    .then((res)=>{

        for(let i =0;i<res.data.length;i++){
        showOnScreen(res.data[i]);
        // console.log(res.data[i]._id);
        }
        
    })
    .catch(err=>console.log(err));
});

function onSubmit(e) {

    e.preventDefault();

    if (inputName.value === '' || emailId.value === '' || phone.value === '') {

        msg.classList.add("error");
        msg.innerHTML = "please fill the fields";

        setTimeout(() => msg.remove(), 3000);
    }
    else { 
        let myobj = {
            name: inputName.value,
            email: emailId.value,
            phone: phone.value,
        }

            axiosInstance.post('/appoinmentData', myobj)
                .then((response) => {
                    showOnScreen(response.data);
                    // console.log(response.data)
                })
                .catch((err) => console.log(err));

            // localStorage.setItem(emailId.value,JSON.stringify(myobj));

            inputName.value = '';
            emailId.value = '';
            phone.value = '';

        }
    }



function showOnScreen(myobj) {
      
    const li =document.createElement('li');
    //deletebutton
    const btn=document.createElement('button');
    //editbutton
    const editBtn =document.createElement('button');
    
    editBtn.innerHTML='Edit';


    li.appendChild(document.createTextNode(`${myobj.name} :${myobj.phone},`));
    li.appendChild(document.createTextNode(`${myobj.email}`))
    btn.innerHTML='Delete';
    btn.style.margin='0px 1rem';

  
    li.appendChild(btn);

    li.appendChild(editBtn);

    userList.appendChild(li);

     //delete functionality
     btn.onclick= () =>{
        if(confirm('Are you sure')){
            
        // localStorage.removeItem(myobj.email);
        axiosInstance.delete(`/appoinmentData/${myobj._id}`)
    
        userList.removeChild(li);
        }
    
    //edit click function
     editBtn.onclick=async ()=>{
        // localStorage.removeItem(myobj.email);

        await axiosInstance.put(`/appoinmentData/${myobj._id}`)
        
        axiosInstance.delete(`/appoinmentData/${myobj._id}`)
        userList.removeChild(li);

        inputName.value=myobj.name;
        emailId.value=myobj.email;
        phone.value =myobj.phone;

    }
}
}







