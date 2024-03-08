import { http, HttpResponse } from "msw";


const country =["India", "USA", "UK"];

export const handlers = [
    http.get('/getcountry', (res) =>{
       return HttpResponse.json([
        {
            user_id:1,country_name:"India"
        },
        {
            user_id:2,country_name:"USA"
        },
        {
            user_id:3,country_name:"UK"
        },
        {
            user_id:4,country_name:"Germany"
        }
        
       ]);

    }),

    http.get('/myOrder', (res) =>{
        return HttpResponse.json([
         {
             sl:1,order_status:"billed", count:37
         },
         {
            sl:2,order_status:"closed", count:2898
        },{
            sl:3,order_status:"cancelled", count:28
        },{
            sl:4,order_status:"In Progress", count:192
        },{
            sl:1,order_status:"billed", count:37
        },
        {
           sl:2,order_status:"closed", count:2898
       },{
           sl:3,order_status:"cancelled", count:28
       },{
           sl:4,order_status:"In Progress", count:192
       },

        ]);
 
     }),
     http.get('/myCashBalance', (res) =>{
        return HttpResponse.json([
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         {
            Sr:"01",Username:"Harshada", Balance:"RS 72,719.00"
         },
         
        ]);
 
     }),
     http.get('/getCountry', (res) =>{
        return HttpResponse.json(country);
     }),
     http.get('getEmployees', (res) => {
       return HttpResponse.json([
           {
             empName : "akash dhoke",
             empId : "09A",
             phoneNo : 96758393434,
             empEmail : "a8hiyt@gmail.com",
             role : "admin",
             panNo : "ZXEDEED",
             dateJoining : "17-Feb-2016",
             lastDate : "16 feb 2018",
             empStatus : "active",
             empId : 34
           },
           {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
          {
            empName : "akash dhoke",
            empId : "09A",
            phoneNo : 96758393434,
            empEmail : "a8hiyt@gmail.com",
            role : "admin",
            panNo : "ZXEDEED",
            dateJoining : "17-Feb-2016",
            lastDate : "16 feb 2018",
            empStatus : "active",
            empId : 34
          },
       ]) 
     })
    
     //************ mock post request ************** */

     
    //  http.post('/addCountry', async ({req}) =>{
    //     // const request = await req.json();
    //     return HttpResponse.json({
    //         content : req,
    //         created : new Date().toLocaleString()
    //     })

    //  })


];