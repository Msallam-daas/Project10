import React from 'react';

class HowToUseModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  closeModal() {
    this.setState({ isOpen: false });
  }

  render() {
    const { isOpen } = this.state;
    if(isOpen) {
      return (
        <div className='basic-modal' onClick={this.closeModal} >
          <div
            onClick={(e) => e.stopPropagation()}
            className='basic-modal-content'
          >
            <div className='modal-top'>
             <div onClick={this.closeModal} className='modal-close-btn'>X</div>
            </div>
            
            <div className='modal-body-scroll'>
              <h5>All Cards</h5>
              <p className='text-justify'>Create your own series of flashcards here. You can view all your flashcards, edit and delete single card, or mark only some of them for practicing just a subset of flashcards.</p>
              <br />
              <h5>Practice</h5>
              <p className='text-justify'>Practice all flashcards you have created. You'll see the question first, then click on the slide to see the answer.</p>
              <br />
              <h5>Marked</h5>
              <p className='text-justify'>Practice only those flashcards you have marked with a star.</p>

              <div className='text-right my-4'>
                <button
                  type='button'
                  className='btn btn-outline-secondary mr-2'
                  onClick={this.closeModal}
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <li className='nav-item'>
        <a
          className='nav-link'
          onClick={this.openModal}
        >
          How To Use
        </a>
      </li>
    );
  }
}

export default HowToUseModal;