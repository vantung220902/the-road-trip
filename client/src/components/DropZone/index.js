import React, { Component } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
class DropZone extends Component {
    render() {
        const { onHandleChang } = this.props;
        return (
            <DropzoneArea
                acceptedFiles={['image/*']}
                dropzoneText={'Drag and drop an image here or click'}
                onDrop={(files) => onHandleChang(files[0])}
            />
        );
    }
}

export default DropZone;
