import React, { useState, useContext, useEffect, useRef } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { CompanyContext } from "../../context/CompanyContext";

const UploadButton = () => {
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewImage, setPreviewImage] = useState([]);
  const [uploadFileList, setUploadFileList] = useState([]);
  const context = useContext(CompanyContext);
  const {
    handleCompanyInfo,
    company,
    resetIconInfo,
    isBusnisessSaved,
    setIsBusinessSaved,
  } = context;
  const { t } = useTranslation();
  const iconRef = useRef();

  const { fileList } = company;

  function onChange(e) {
    const fileToUpLoad = new FileReader();
    fileToUpLoad.readAsDataURL(e.file.originFileObj);
    fileToUpLoad.onload = () => setPreviewImage(fileToUpLoad.result);
    handleCompanyInfo("fileList", e.fileList);
    handleCompanyInfo("image", e.file.originFileObj);
    handleCompanyInfo("type", e.file.type);
    handleCompanyInfo("hasIcon", true);
    setUploadFileList(e.fileList);
  }

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleCancel = () => {
    setShowPreviewModal(false);
  };

  const onRemove = (e) => {
    console.log("se ha eliminado el icono");
    setShowPreviewModal(false);
    setTimeout(() => {
      resetIconInfo();
    }, 700);
  };

  useEffect(() => {
    console.log(typeof fileList);
  }, [handleCompanyInfo]);

  useEffect(() => {
    if (isBusnisessSaved) {
      setUploadFileList([]);
      setIsBusinessSaved(false);
    }
  }, [isBusnisessSaved]);

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
        ref={iconRef}
        fileList={uploadFileList}
      >
        {fileList.length === 0 && (
          <Button>
            {t("upload-bussiness-icon")}
            <PlusCircleFilled />
          </Button>
        )}
      </Upload>
      {showPreviewModal && (
        <Modal
          open={showPreviewModal}
          footer={null}
          onCancel={handleCancel}
          bodyStyle={{ padding: "10px" }}
        >
          <img
            width={"100%"}
            src={company?.icon?.image !== "" || undefined ? previewImage : null}
          />
        </Modal>
      )}
    </>
  );
};

export default UploadButton;
