new Vue({
  el: "#app",

  data: {
    data: [],
    form_edit: false,
    form_delete: false,
    form_create: false,
    title: "",
    text: "",
    input: {
      fullname: "",
      dni: "",
      workspace: "",
      role: "",
      salary: "",
      lineManager: "",
      phone: "",
      personalEmail: "",
      corporativeEmail: "",
    },
    filters: [],
  },

  created() {
    this.fields = [
      {
        name: "id",
        label: "Id",
        align: "right",
        type: "text",
      },
      {
        name: "fullname",
        label: "Full name",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "dni",
        label: "DNI",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "workspace",
        label: "Workspace",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "role",
        label: "Role",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "salary",
        label: "Salary",
        align: "left",
        type: "number",
        required: true,
      },
      {
        name: "lineManager",
        label: "Line Manager",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "phone",
        label: "Phone",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "personalEmail",
        label: "Personal Email",
        align: "left",
        type: "text",
        required: true,
      },
      {
        name: "corporativeEmail",
        label: "Corporative Email",
        align: "left",
        type: "text",
        required: true,
      },
    ];

    fetch("http://localhost:3000/api/v1/employees")
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
      })
      .catch((error) => {
        console.error("Error al hacer fetch a los empleados: ", error);
      });
  },

  methods: {
    getField: function (name) {
      var value = null;
      this.fields.forEach(function (item) {
        if (item.name == name) {
          value = item;
        }
      });
      return value;
    },

    getAllEmployees: function () {
      fetch("http://localhost:3000/api/v1/employees")
        .then((response) => response.json())
        .then((data) => {
          this.data = data;
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    },

    createEmployee(event, body) {
      event.preventDefault();

      console.log("El body es:");
      console.log(body);

      fetch("http://localhost:3000/api/v1/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error("Error al crear empleado: ", error);
          this.$q.notify({
            color: "negative",
            message: `Tienes un error con: ${error.message}`,
          });
        });
    },

    commit(input) {
      const body = {};

      // Recorremos todos los atributos de input y los agregamos al objeto body
      for (const attr in input) {
        if (input.hasOwnProperty(attr)) {
          // Si el atributo es 'salary', lo convertimos a un número de coma flotante
          body[attr] =
            attr === "salary" ? parseFloat(input[attr]) : input[attr];
        }
      }

      this.createEmployee(event, body);
      this.form_create = false;
    },

    edit: function (record) {
      this.input = record;
      this.form_edit = true;
    },

    filter: function () {
      this.$q.notify("Filter list");
    },

    openCreateDialog() {
      this.form_create = true;
    },
  },
});
