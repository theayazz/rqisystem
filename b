//logo
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
      $('#imagePreview').hide();
      $('#imagePreview').fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$('#companyLogo').change(function () {
  readURL(this);
});
const uploadLogo = multer({
  storage: multer.memoryStorage),
  /* limits: { fileSize: 2 * 1024 * 1024 }, */
});

//ifSame change if true companyLegalName = companyName
$(document).ready(function () {
  $('#companyName').on('change', function () {
    if ($(this).val() != '') {
      $('#ifSame').prop('disabled', false);
      //ifSame change event companyLegalName=companyName
      $('#ifSame').on('change', function () {
        if ($(this).is(':checked')) {
          $('#companyLegalName').val($('#companyName').val());
        } else {
          $('#companyLegalName').val('');
        }
      });
    } else {
      $('#ifSame').prop('disabled', true);
      $('#ifSame').prop('checked', false);
    }
  });
});
<div class='p-1 w-full flex items-center justify-center'>
  <div class='relative'>
    <div class='absolute right-3 z-10 top-0'>
      <input
        type='file'
        id='companyLogo'
        class='hidden'
        name='companyLogo'
        accept='.png, .jpg, .jpeg'
      />
      <label
        for='companyLogo'
        class='w-9 h-9 mb-0 flex items-center justify-center rounded-full bg-white cursor-pointer font-normal hover:bg-gray-200 border-gray-200 absolute top-0 right-0 dark:bg-gray-900 dark:text-slate-100 text-size-lg dark:hover:bg-gray-800'
      ><svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke-width='1.5'
          stroke='currentColor'
          class='w-6 h-6'
        >
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z'
          ></path>
        </svg>
      </label>
    </div>
    <div
      class='w-[192px] h-[192px] relative rounded-full border-1 border-gray-200 shadow-soft-gray dark:shadow-dark-gray'
    >
      <div
        id='imagePreview'
        class='w-full h-full rounded-full bg-cover bg-no-repeat bg-center'
        style='background-image: url(https://img.freepik.com/premium-psd/logo-mockup-empty-entrance-wall-with-light-branding_176814-93.jpg);'
      >
      </div>
    </div>
  </div>

</div>


$('.new-company-form').on('submit', function (e) {
  e.preventDefault();
  $.ajax({
    url: '/api/company/company-list/new',
    type: 'POST',
    data: $(this).serialize(),
    success: function (data) {
      if (data.status === 'success') {
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: data.status==='fail' ? 'error' : 'success',
          text: data.message,
        });
        setTimeout(() => {
          window.location.href = '/api/company/company-list';
        }, 2000);
      } else{
        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        }).fire({
          icon: 'error',
          text: data.message,
        });
      }
    },
    
  });
});




${_getDetails().then((data) => {
  const { phone_types } = data;
  phone_types.forEach((item) => {
    $('#type' + i).editableSelect('add', function () {
      $(this).val(item.id);
      $(this).html(item.type);
    });
  });
})}


const _getDetails = async () => {
  const response = await fetch('/api/company/company-list/getImportingData');
  const data = await response.json();
  for (let item in data) {
    tablesFromBackend[item] = data[item];
  }
  //console.log(tablesFromBackend, '_getDetails daxilinde');
  return data;
};
_getDetails();