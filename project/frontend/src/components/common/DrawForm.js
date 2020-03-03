import React from "react";
import FormField from "./FormField";

export default function DrawForm(fields, onChangeFunction, halfColumn) {
	return fields.map((field, index) => (
		<div className={halfColumn ? "col-lg-6" : ""} key={index}>
			<FormField
				onChange={onChangeFunction}
				fieldLabel={field.fieldLabel}
				fieldName={field.fieldName}
				fieldType={field.fieldType}
				iconType={field.iconType}
				value={field.value}
				fieldRequired={field.fieldRequired}
			/>
		</div>
	));
}
