import React, { useState, useContext } from "react";
import { Upload, Modal, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { handleUploadFile } from "../../supabase/storage";
import { CompanyContext } from "../../context/CompanyContext";

const UploadButton = () => {
  const [fileList, setFileList] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [titleModal, setTitleModal] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const context = useContext(CompanyContext);
  const { handleCompanyInfo } = context;
  const { t } = useTranslation();

  const onChange = (e) => {
    const file = new FileReader();
    file.readAsDataURL(e.file.originFileObj);
    file.onload = () => setPreviewImage(file.result);
    setFileList(e.fileList);

    console.log(fileList);

    if (fileList !== []) {
      handleCompanyInfo("icon", fileList[0]);
    }
  };

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
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
