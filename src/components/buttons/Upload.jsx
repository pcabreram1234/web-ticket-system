import React, { useState, useContext, useEffect, useRef } from "react";
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
  const [iconIsRemove, setIconIsRemove] = useState(false);
  const context = useContext(CompanyContext);
  const userContext = useContext(AuthContext);
  const { handleCompanyInfo, company } = context;
  const { user } = userContext;
  const { t } = useTranslation();
  const iconRef = useRef();

  function onChange(e) {
    console.log(iconRef.current);
    const fileToUpLoad = new FileReader();
    fileToUpLoad.readAsDataURL(e.file.originFileObj);
    fileToUpLoad.onload = () => setPreviewImage(fileToUpLoad.result);
    setFileList(e.fileList);
    updateImageName(e.fileList.originFileObj, e.fileList.type);
    console.log(e);
  }

  const updateImageName = (imageToUpload, typeImageToUpload) => {
    if (fileList.length > 0) {
      console.log(company);
      setImagePath(`/${user.id}/${company.name}`);
      setImage(imageToUpload);
      setType(typeImageToUpload);
      handleCompanyInfo("icon", {
        imagePath: imagePath,
        image: image,
        type: type,
      });
      handleCompanyInfo("hasIcon", true);
    }
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleCancel = () => {
    setShowPreviewModal(false);
  };

  const onRemove = () => {
    setFileList([]);
    console.log("se ha eliminado el icono");
    setIconIsRemove(true);
    setShowPreviewModal(false);
  };

  useEffect(() => {
    handleCompanyInfo("hasIcon", false);
    handleCompanyInfo("icon", { image: "", type: "", imagePath: "" });
    setIconIsRemove(false);
  }, [iconIsRemove]);

  useEffect(() => {
    const lengthOfFileListToUpload = iconRef.current.fileList.length;
    console.log(lengthOfFileListToUpload);
    if (lengthOfFileListToUpload > 0) {
      console.log("Existe un icono para subir");
      console.log(iconRef.current);
      updateImageName(
        iconRef.current.fileList[0].originFileObj,
        iconRef.current.fileList[0].type
      );
    }
  }, [company.name]);

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
        ref={iconRef}
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
