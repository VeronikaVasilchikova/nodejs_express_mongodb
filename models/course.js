const {Schema, model} = require("mongoose");

const course = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  img: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

course.method("toClient", function() {
  const course = this.toObject();
  course.id = course._id;
  delete course._id;
  return course;
});

module.exports = model("Course", course);

// const uuid = require("uuid/v4");
// const path = require("path");
// const fs = require("fs");

// class Course {
//   constructor(title, price, img) {
//     this.id = uuid();
//     this.title = title;
//     this.price = price;
//     this.img = img;
//   }

//   toJSON() {
//     return {
//       title: this.title,
//       price: this.price,
//       img: this.img,
//       id: this.id
//     };
//   }

//   async save() {
//     const course = await Course.getAll();
//     course.push(this.toJSON());
//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, "..", "data", "course.json"),
//         JSON.stringify(course),
//         (err) => {
//           if (err) {
//             reject(err);
//           }
//           else {
//             resolve();
//           }
//         }
//       );
//     });
//   }

//   static async update(course) {
//     const courses = await Course.getAll();

//     const index = courses.findIndex(item => item.id === course.id);
//     courses[index] = course;
//     return new Promise((resolve, reject) => {
//       fs.writeFile(
//         path.join(__dirname, "..", "data", "course.json"),
//         JSON.stringify(courses),
//         (err) => {
//           if (err) {
//             reject(err);
//           }
//           else {
//             resolve();
//           }
//         }
//       );
//     });
//   }

//   static getAll() {
//     return new Promise((resolve, reject) => {
//       fs.readFile(
//         path.join(__dirname, "..", "data", "course.json"),
//         "utf-8",
//         (err, content) => {
//           if (err) {
//             reject(err);
//           }
//           else {
//             resolve(JSON.parse(content));
//           }
//         }
//       );
//     });
//   }

//   static async getById(id) {
//     const courses = await Course.getAll();
//     return courses.find(item => item.id === id);
//   }
// }

// module.exports = Course;