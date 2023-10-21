import React, { useState, useContext, useEffect } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CompanyContext } from "../../context/CompanyContext";
import { AuthContext } from "../../context/UserContext";

const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [titleModal, setTitleModal] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [imagePath, setImagePath] = useState([]);
  const [image, setImage] = useState([]);
  const [type, setType] = useState([]);
  const context = useContext(CompanyContext);
  const userContext = useContext(AuthContext);
  const { handleCompanyInfo, name } = context;
  const { user } = userContext;
  const { t } = useTranslation();

  function onChange(e) {
    const fileToUpLoad = new FileReader();
    fileToUpLoad.readAsDataURL(e.file.originFileObj);
    fileToUpLoad.onload = () => setPreviewImage(fileToUpLoad.result);
    setFileList(e.fileList);
    if (fileList.length > 0) {
      const userNameSplitted = user.email.split("@");
      setImagePath(`/${user.id}/${userNameSplitted[0]}_${name}`);
      setImage(e.file.originFileObj);
      setType(e.file.type.toString());
      handleCompanyInfo("icon", {
        imagePath: imagePath,
        image: image,
        type: type,
      });
      handleCompanyInfo("hasIcon", true);
    }
  }

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleCancel = () => {
    setShowPreviewModal(false);
  };

  const onRemove = (e) => {
    setShowPreviewModal(false);
    setFileList([]);
  };

  useEffect(() => {
    console.log(fileList);
  }, [setFileList]);

  useEffect(() => {
    console.log("Se ha cambiado el nombre del negocio a " + name);
  }, [name]);

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
