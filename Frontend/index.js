new Vue({
  el: "#app",

  data: {
    data: {},
    form_edit: false,
    form_delete: false,
    form_create: false,
    title: "",
    text: "",
    input: [],
    filters: [],
  },

  created() {
    this.data = [];

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
      },
      {
        name: "dni",
        label: "DNI",
        align: "left",
        type: "text",
      },
      {
        name: "workspace",
        label: "Workspace",
        align: "left",
        type: "text",
      },
      {
        name: "role",
        label: "Role",
        align: "left",
        type: "text",
      },
      {
        name: "salary",
        label: "Salary",
        align: "left",
        type: "number",
      },
      {
        name: "lineManager",
        label: "Line Manager",
        align: "left",
        type: "text",
      },
      {
        name: "phone",
        label: "Phone",
        align: "left",
        type: "text",
      },
      {
        name: "personalEmail",
        label: "Personal Email",
        align: "left",
        type: "text",
      },
      {
        name: "corporativeEmail",
        label: "Corporative Email",
        align: "left",
        type: "text",
      },
    ];

    fetch("http://localhost:3000/api/v1/employees")
      .then((response) => response.json())
      .then((data) => {
        this.data = data;
        console.log("Esto es data normal, la que llegó");
        console.log(data);
        console.log("Esto ya es data this");
        console.log(this.data);
      })
      .catch((error) => {
        console.error("Error fetching employees: ", error);
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

    edit: function (record) {
      this.input = record;
      this.form_edit = true;
    },

    commit: function (record) {
      this.$q.notify(
        `Se ha creado correctamente el usuario con nombre ${record.id}`
      );
    },

    filter: function () {
      this.$q.notify("Filter list");
    },

    openCreateDialog() {
      this.form_create = true;
    },
  },
});
