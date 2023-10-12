import { supabase } from "../../supabase/index";
import { openNotification } from "../../components/notifications/NotConnection";
const budget = import.meta.env["VITE_BUDGET_ID"];

export async function handleUploadFile(file, filePath) {
  const { data, error } = await supabase.functions.invoke("hello-world", {
    body: { name: "Phillip" },
    headers: "Access-Control-Allow-Origin'",
  });

  console.log(data, error);
  // const { data, error } = await supabase.storage
  //   .from(budget)
  //   .upload(filePath, file);

  // if (error) {
  //   console.log(error);
  //   openNotification("upload-file-error", error.message, "error");
  // } else {
  //   openNotification("upload-file-success", "", "success");
  // }
}
