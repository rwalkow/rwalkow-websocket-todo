import Form from '../../common/Form/Form';
import ButtonSubmit from '../../common/ButtonSubmit/ButtonSubmit';
import Input from '../../common/Input/Input';

const AddForm = ({ action, taskName, setTaskName }) => {
  return (
    <Form id="add-task-form">
      <Input className="text-input" autoComplete="off" type="text" placeholder="Type your description" id="task-name" value={taskName} onChange={e => setTaskName(e.target.value)}/>
      <ButtonSubmit>Add</ButtonSubmit>
    </Form>
  );
};

export default AddForm;
