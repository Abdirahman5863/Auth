import { Input } from "../ui/input";

export default function CommonTypeElement({currentItem, value, onChange}) {
    let content= null
  switch (currentItem.CommonType) {
    case "input":
      content = (
        <Input
          value={value}
          onChange={onChange}
          name={currentItem.name}
          id={currentItem.name}
          placeHolder={currentItem.placeHolder}
          type={currentItem.type}
        />
      );
      break;

    default:
        content = (
            <Input
              type={currentItem.type}
              id={currentItem.id}
              value={value}
              onChange={onChange}
              name={currentItem.name}
            />
          );
      break;
  }
  return content;
}
