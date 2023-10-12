import React, { useState, useContext } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CompanyContext } from "../../context/CompanyContext";
import { AuthContext } from "../../context/UserContext";
import { supabase } from "../../supabase";
const URL_UPLOAD_IMAGE = import.meta.env["VITE_FETCH_UPLOAD_IMAGE"];

const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [titleModal, setTitleModal] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const context = useContext(CompanyContext);
  const userContext = useContext(AuthContext);
  const { handleCompanyInfo, company } = context;
  const { user } = userContext;
  const { t } = useTranslation();

  async function onChange(e) {
    const file = new FileReader();
    file.readAsDataURL(e.file.originFileObj);
    file.onload = () => setPreviewImage(file.result);
    setFileList(e.fileList);

    if (fileList.length > 0) {
      const userNameSplitted = user.email.split("@");
      const imagePath = `/${user.id}/${userNameSplitted[0]}`;
      handleCompanyInfo("icon", file);
      const { data, error } = await supabase.storage
        .from("web-ticket-storage")
        .upload(imagePath, e.file.originFileObj, {
          contentType: e.file.type.toString(),
          upsert: true,
          cacheControl: "3600",
        });
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
  }

  const handlePreview = (file) => {
    setShowPreviewModal(true);
  };

  const handleCancel = () => {
    setShowPreviewModal(false);
  };

  const onRemove = (e) => {
    setShowPreviewModal(false);
    setFileList([]);
  };

  const ButtonToUpload = (
    <Button>
      {t("upload-bussiness-icon")}
      <PlusCircleFilled />
    </Button>
  );

  return (
    <>
      <Upload
        accept="image/*"
        onChange={onChange}
        onRemove={onRemove}
        onPreview={handlePreview}
        multiple={false}
        listType="picture-circle"
        maxCount={1}
        fileList={fileList}
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      >
        {fileList.length < 1 && (
          <Button>
            {t("upload-bussiness-icon")}
            <PlusCircleFilled />
          </Button>
        )}
      </Upload>
      {showPreviewModal && (
        <Modal
          open={showPreviewModal}
          title={titleModal}
          footer={null}
          onCancel={handleCancel}
          bodyStyle={{ padding: "10px" }}
        >
          <img width={"100%"} src={previewImage} />
        </Modal>
      )}
    </>
  );
};

export default UploadButton;
