import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import {
  apiPostUser,
  apiGetUser,
  apiUpdateUser,
  apiDeleteUser,
} from "../helper/api";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

const schema = Joi.object().keys({
  firstName: Joi.string().min(1).max(30).required(),
  lastName: Joi.string().min(1).max(30).required(),
  email: Joi.string()
    .min(1)
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
});

function UserForm() {
  const initalState = { email: "", firstName: "", lastName: "" };
  const [form, setForm] = useState(initalState);
  const [formError, setFormError] = useState({});
  const history = useHistory();
  const [user, setUser] = useState([]);

  const id = Number(useParams().id) || undefined;

  function handleChange(evt) {
    const { name, value } = evt.target;
    setForm((data) => ({ ...data, [name]: value }));
  }

  async function postUser(data) {
    try {
      await apiPostUser(data);
    } catch (error) {}
  }

  async function updateUser(data) {
    try {
      await apiUpdateUser(id, data);
    } catch (error) {}
  }

  async function deleteUser(data) {
    try {
      await apiDeleteUser(id);
    } catch (error) {}
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const errors = validate();
    setFormError(errors);

    if (errors) return;
    await postUser(form);
    setFormError({});
    history.push("/");
  }

  async function handleUpdate(evt) {
    evt.preventDefault();
    const errors = validate();
    setFormError(errors);

    if (errors) return;
    let data = { id: user.id, state: user.state, ...form };
    await updateUser(data);
    setFormError({});
    history.push("/");
  }

  async function handleDelete(evt) {
    evt.preventDefault();
    await deleteUser(id);
    history.push("/");
  }

  function validate() {
    const result = Joi.validate(form, schema, { abortEarly: false });
    if (!result.error) return null;
    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  }

  useEffect(() => {
    async function getUser() {
      setForm("loading");
      try {
        let res = await apiGetUser(id);
        let data = res.data;
        setUser(res.data);
        setForm({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
        });
      } catch (error) {
        setUser("notFound");
      }
    }
    if (id) getUser();
  }, [id]);

  if (id && user === "loading") {
    return <div>loading</div>;
  }
  if (id && user === "notFound") {
    return <div>notFound</div>;
  }

  return (
    <div>
      <Form>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            invalid={formError && formError.email}
          />
          <FormFeedback>{formError && formError.email}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="firstName">firstName</Label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            value={form.firstName}
            onChange={handleChange}
            invalid={formError && formError.firstName}
          />
          <FormFeedback>{formError && formError.firstName}</FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="lastName">lastName</Label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            value={form.lastName}
            onChange={handleChange}
            invalid={formError && formError.lastName}
          />
          <FormFeedback>{formError && formError.lastName}</FormFeedback>
        </FormGroup>

        {!id && <Button onClick={handleSubmit}>Submit</Button>}
        {id && <Button onClick={handleUpdate}>Update</Button>}
        {id && <Button onClick={handleDelete}>Delete</Button>}
      </Form>
    </div>
  );
}

export default UserForm;
