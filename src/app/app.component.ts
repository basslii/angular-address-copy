import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { EMPTY } from 'rxjs';
import { tap, distinctUntilChanged, switchMap, startWith} from 'rxjs/operators';


interface Address {
  street: string,
  postcode: string,
  state: string,
  city: string,
  country: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public isSameAddressControl: FormControl = new FormControl(false);
  public isSameAddressControl0: FormControl = new FormControl(false);

  public addresses: FormGroup = this.fb.group({
    permanentAddress: this.fb.group({
      street: "",
      postcode: "",
      state: "",
      city: "",
      country: ""
    }),
    mailingAddress: this.fb.group({
      street: "",
      postcode: "",
      state: "",
      city: "",
      country: ""
    })
  });

  public spouseaddresses: FormGroup = this.fb1.group({
    wifeAddress: this.fb1.group({
      street: "",
      postcode: "",
      state: "",
      city: "",
      country: ""
    }),
    // mailingAddress: this.fb.group({
    //   street: "",
    //   postcode: "",
    //   state: "",
    //   city: "",
    //   country: ""
    // })
  });

  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder
    ) {}


  ngOnInit() {
    this.isSameAddressControl0.valueChanges.pipe(
      distinctUntilChanged(),
      switchMap(isSameAddress => {
        if(isSameAddress) {
          return this.addresses.get('permanentAddress')!.valueChanges.pipe(
            startWith(this.addresses.get('permanentAddress')!.value),
            tap(value =>
              this.addresses.get('mailingAddress')!.setValue(value)
              )
          )
        } else {
          this.addresses.get('mailingAddress')!.reset();

          return EMPTY;
        }
      })
    )
    .subscribe();

      this.isSameAddressControl.valueChanges.pipe(
        distinctUntilChanged(),
        switchMap(isSameAddress => {
          if(isSameAddress) {
            return this.addresses.get('permanentAddress')!.valueChanges.pipe(
              startWith(this.addresses.get('permanentAddress')!.value),
              tap(value =>
                this.spouseaddresses.get('wifeAddress')!.setValue(value)
                )
            )
          } else {
            this.spouseaddresses.get('wifeAddress')!.reset();

            return EMPTY;
          }
        })
      )
      .subscribe();
  }

  disable: any = "true";



}

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { EMPTY } from 'rxjs';
// import { tap, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';

// interface Address {
//   street: string;
// }

// @Component({
//   selector: 'my-app',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent implements OnInit {
//   public isSameAddressControl: FormControl = new FormControl(false);

//   public addresses: FormGroup = this.fb.group({
//     sendingAddress: this.fb.group({
//       street: '',
//     }),
//     billingAddress: this.fb.group({
//       street: '',
//     })
//   });

//   constructor(private fb: FormBuilder) { }

//   ngOnInit() {
//     this.isSameAddressControl
//       .valueChanges
//       .pipe(
//         distinctUntilChanged(),
//         switchMap(isSameAddress => {
//           if (isSameAddress) {
//             return this.addresses.get('sendingAddress')!.valueChanges.pipe(
//                 // at the beginning fill the form with the current values
//                 startWith(this.addresses.get('sendingAddress')!.value),
//                 tap(value =>
//                   // every time the sending address changes, update the billing address 
//                   this.addresses
//                     .get('billingAddress')!
//                     .setValue(value)
//                 )
//               )
//           } else {
//             this.addresses
//               .get('billingAddress')!
//               .reset();

//             return EMPTY;
//           }
//         })
//         // don't forget to unsubscribe when component's destroyed
//       )
//       .subscribe();
//   }
// }