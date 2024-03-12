import { http, HttpResponse } from "msw";


const country = ["India", "USA", "UK"];

export const handlers = [
   // http.get('/getcountry', (res) => {
   //    return HttpResponse.json([
   //       {
   //          user_id: 1, country_name: "India"
   //       },
   //       {
   //          user_id: 2, country_name: "USA"
   //       },
   //       {
   //          user_id: 3, country_name: "UK"
   //       },
   //       {
   //          user_id: 4, country_name: "Germany"
   //       }

   //    ]);

   // }),
   http.get('/getcity', (res) => {
      return HttpResponse.json([
         {
            user_id: 1,
            country_name: "India",
            state_name: "Goa",
            city_name: "Panaji"
         },
         {
            user_id: 2,
            country_name: "India",
            state_name: "Kerala",
            city_name: "Thiruvananthapuram",
         },
         {
            user_id: 3,
            country_name: "India",
            state_name: "Madhya pradesh",
            city_name: "Bhopal",
         },
         {
            user_id: 4,
            country_name: "India",
            state_name: "Maharastra",
            city_name: "Mumbai",
         },
         {
            user_id: 5,
            country_name: "India",
            state_name: "Rahjesthan",
            city_name: "jaipur",
         },

      ]);

   }),

   http.get('/getlocality', (res) => {
      return HttpResponse.json([
         {
            user_id: 1,
            country_name: "India",
            state_name: "Goa",
            city_name: "Panaji",
            locality_name:"Miramar"
         },
         {
            user_id: 2,
            country_name: "India",
            state_name: "Kerala",
            city_name: "Thiruvananthapuram",
            locality_name:"Sreekariyam"
         },
         {
            user_id: 3,
            country_name: "India",
            state_name: "Madhya pradesh",
            city_name: "Bhopal",
            locality_name:"Bairagarh"
         },
         {
            user_id: 4,
            country_name: "India",
            state_name: "Maharastra",
            city_name: "Mumbai",
            locality_name:"Varosa"
         },
         {
            user_id: 5,
            country_name: "India",
            state_name: "Rahjesthan",
            city_name: "jaipur",
            locality_name:"Vaishali Nagar"
         },

      ]);

   }),

   http.get('/getstate', (res) => {
      return HttpResponse.json([
         {
            user_id: 1,
            country_name: "India",
            state_name: "Goa",
         },
         {
            user_id: 2,
            country_name: "India",
            state_name: "Kerala",
         },
         {
            user_id: 3,
            country_name: "India",
            state_name: "Madhya pradesh",
         },
         {
            user_id: 4,
            country_name: "India",
            state_name: "Maharastra",
         },
         {
            user_id: 5,
            country_name: "India",
            state_name: "Rahjesthan",
         },

      ]);

   }),

   http.get('/myOrder', (res) => {
      return HttpResponse.json([
         {
            sl: 1, order_status: "billed", count: 37
         },
         {
            sl: 2, order_status: "closed", count: 2898
         }, {
            sl: 3, order_status: "cancelled", count: 28
         }, {
            sl: 4, order_status: "In Progress", count: 192
         }, {
            sl: 1, order_status: "billed", count: 37
         },
         {
            sl: 2, order_status: "closed", count: 2898
         }, {
            sl: 3, order_status: "cancelled", count: 28
         }, {
            sl: 4, order_status: "In Progress", count: 192
         },

      ]);

   }),
   http.get('/myCashBalance', (res) => {
      return HttpResponse.json([
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },
         {
            Sr: "01", Username: "Harshada", Balance: "RS 72,719.00"
         },

      ]);

   }),
   http.get('/getCountry', (res) => {
      return HttpResponse.json(country);
   }),
   http.get('getEmployees', (res) => {
      return HttpResponse.json([
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
         {
            empName: "akash dhoke",
            empId: "09A",
            phoneNo: 96758393434,
            empEmail: "a8hiyt@gmail.com",
            role: "admin",
            panNo: "ZXEDEED",
            dateJoining: "17-Feb-2016",
            lastDate: "16 feb 2018",
            empStatus: "active",
            empId: 34
         },
      ])
   }),

   http.get('/getbuilders', (res) => {
      return HttpResponse.json([
         {
            user_id: 1,
            country_name: "India",
            suburb_name: "Range Hill Corner Pune",
            city_name: "Pune",
            builder_name:"Abil House"
         },
         {
            user_id: 2,
            country_name: "India",
            suburb_name: "Shivaginagar",
            city_name: "Pune",
            builder_name:"Achalare Assciates"
         },
         {
            user_id: 3,
            country_name: "India",
            suburb_name: "Navi Peth",
            city_name: "Pune",
            builder_name:"Acumen Developers PVT LTD"
         },
         {
            user_id: 4,
            country_name: "India",
            suburb_name: "Kothrud",
            city_name: "Pune",
            builder_name:"Adarsh Developer"
         },
         {
            user_id: 5,
            country_name: "India",
            suburb_name: "Sadashiv Peth",
            city_name: "Pune",
            builder_name:"Aditya Builders"
         },

      ]);

   }),
   http.get('/getprospect', (res) => {
      return HttpResponse.json([
         {
            user_id: 1,
            person_name: "Test",
            suburb_name: "Test",
            city_name: "Pune",
            property_location:"Test",
            possible_location:"Test",
         },

      ]);

   }),

   //************ mock post request ************** */


   //  http.post('/addCountry', async ({req}) =>{
   //     // const request = await req.json();
   //     return HttpResponse.json({
   //         content : req,
   //         created : new Date().toLocaleString()
   //     })

   //  })


];