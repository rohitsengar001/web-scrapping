import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatphone',
  standalone: true,
})
export class FormatphonePipe implements PipeTransform {
  transform(
    input: string,
    arg : Array<string>
  ): unknown {
    if(input.length === 0) return ''
    let cleanedInput = input;
    let specialCharactersToRemove = ['-', ' ']
    specialCharactersToRemove= [...specialCharactersToRemove,...arg]
    specialCharactersToRemove.forEach((char) => {
      const regex = new RegExp(`\\${char}`, 'g');
      cleanedInput = cleanedInput.replace(regex, '');
    });

    // Step 2: Remove leading zeros
    cleanedInput = cleanedInput.replace(/^0+/, '');

    // Step 3: Keep only digits
    cleanedInput = cleanedInput.replace(/\D/g, '');

    if (cleanedInput.length === 0) return '';

    // Step 5: Format the string to (999)-999-9999
    const formattedNumber = `(${cleanedInput.slice(0, 3)})-${cleanedInput.slice(
      3,
      6
    )}-${cleanedInput.slice(6, 11)}`;

    return formattedNumber;
  }
}
