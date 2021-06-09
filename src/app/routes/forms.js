const Form = require('../../database/models');
const multer = require('multer');
const path = require ('path');

function forms(router) {
//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, path.join(__dirname, "../../../public/uploads/"));
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});


//view route
  router.get('/new', (request, response) => {
    response.render('new');
  });


router.get('/:cc', async (request, response) => {
  let form = await Form.findOne({ cc: request.params.cc });

  if (form) {
    response.render('show', { form: form });
  } else {
    response.redirect('/');
  }
});

//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  let form = new Form({
    name: request.body.name,
    lastName: request.body.lastName,
    type: request.body.type,
    cc: request.body.cc,
    email: request.body.email,
    phone: request.body.phone,
    birthday: request.body.birthday,
    image: request.file.filename,
  });

  try {
    form = await form.save();
    response.redirect(`forms/${form.slug}`);
  } catch (error) {
    console.log(error);
  }
});

// route that handles edit view
router.get('/edit/:id', async (request, response) => {
  let form = await Form.findById(request.params.id);
  response.render('edit', { form: form });
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.form = await Form.findById(request.params.id);
  let form = request.form;
  form.name = request.body.name;
  form.lastName = request.body.lastName;
  form.type = request.body.type;
  form.cc = request.body.cc;
  form.email = request.body.email;
  form.phone = request.body.phone;
  form.birthday = request.body.birthday;
  // form.description = request.body.description;

  try {
    form = await form.save();
    //redirect to the view route
    response.redirect(`/forms/${form.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/seforms/edit/${form.id}`, { form: form });
  }
});

//route to handle delete
router.delete('/:id', async (request, response) => {
  await Form.findByIdAndDelete(request.params.id);
  response.redirect('/');
});

}

module.exports = forms;