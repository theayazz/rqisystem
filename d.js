function fetch_bFilials(parent_element, child_element, type) {
  fetch(
    '/api/company/company-list/new/get_bfilials?type=' +
      type +
      '&parent_value=' +
      parent_element.value +
      '',
    { method: 'GET', headers: { 'Content-Type': 'application/json' } },
  )
    .then((response) => response.json())
    .then((responseData) => {
      var html_h = [];
      var html_full = [];
      if (responseData.length > 0) {
        for (var i = 0; i < responseData.length; i++) {
          //
          html_h.push(responseData[i].filial_name);
          html_full.push(responseData[i]);
        }
      }
      $(child_element).editableSelect('clear');
      html_full.map((item) => {
        $(child_element).editableSelect('add', item[`bank_filials.filial_name`]);
      });
      //selected data get id
      $(child_element).on('select.editable-select', function (e, li) {
        var selected = li.text();
        var selected_id = html_full.find((item) => item[`bank_filials.filial_name`] === selected)[
          'bank_filials.id'
        ];
        $(child_element).attr('data-id', selected_id);
        //find selected.id in html_full array and get id value and set it to data-id attribute and and find bic_swift_code and set input id=swift_bik value
        var bic_swift_code = html_full.find((item) => item[`bank_filials.id`] === selected_id)[
          'bic_swift_code'
        ];
        $('#swift_bik').val(bic_swift_code);
        //find selected.id in html_full array and get id value and set it to data-id attribute and and find bank_voen and set input id=bank_voen value
        var bank_voen = html_full.find((item) => item[`bank_filials.id`] === selected_id)[
          'bank_voen'
        ];
        $('#bank_voen').val(bank_voen);
        //find selected.id in html_full array and get id value and set it to data-id attribute and and find bank_filials.filial_code and set input id=part_code value
        var part_code = html_full.find((item) => item[`bank_filials.id`] === selected_id)[
          'bank_filials.filial_code'
        ];
        $('#part_code').val(part_code);
        //find selected.id in html_full array and get id value and set it to data-id attribute and and find bank_filials.filial_address and set input id=part_address value
        var part_address = html_full.find((item) => item[`bank_filials.id`] === selected_id)[
          'bank_filials.filial_address'
        ];
        $('#part_address').val(part_address);
      });
    });
}
_('bank').onselect = function (e) {
  _('part').value = '';
  fetch_bFilials(_('bank'), _('part'), 'load_part');
};

//! sval
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
        }).fire({ icon: data.status === 'fail' ? 'error' : 'success', text: data.message });
        setTimeout(() => {
          window.location.href = '/api/company/company-list';
        }, 2000);
      } else {
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
        }).fire({ icon: 'error', text: data.message });
      }
    },
  });
});
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
