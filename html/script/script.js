document.querySelector('.floatingBtn').addEventListener(
  // eslint-disable-next-line func-names
  'click', function() {
    //   console.log(this);
    this.classList.remove('floatingBtn');
  }, true);

document.querySelector('.miniPlayer .close').addEventListener('click', () => {
  document.querySelector('.miniPlayer').classList.add('floatingBtn');
});

document.querySelector('.progress').addEventListener('mouseover', () => {
  document.querySelector('.tooltip').style.display = 'block';
});

document.querySelector('.progress').addEventListener('mouseout', () => {
  document.querySelector('.tooltip').style.display = 'none';
});