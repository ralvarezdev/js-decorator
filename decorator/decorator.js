// Errors that can be thrown in the code
export const INVALID_METADATA_KEY_ERROR = new Error("Invalid metadata key");
export const METADATA_KEY_ALREADY_EXISTS_ERROR = "Metadata key already exists"
export const METADATA_KEY_NOT_FOUND_ERROR = "Metadata key not found"
export const METADATA_NOT_FOUND_ERROR = "Metadata not found"
export const INVALID_TARGET_OBJECT_ERROR = new Error("Invalid target object");
export const PROPERTY_NOT_FOUND_ERROR = "Property not found"

// Metadata key
export const METADATA_KEY = "metadata";

// GetPropertyPrototype gets the property prototype
export function GetPropertyPrototype(target, property) {
    // Get the class prototype
    const prototype = target?.prototype;
    if (!prototype)
        throw INVALID_TARGET_OBJECT_ERROR

    // Get the class prototype
    const prototypeProperty = prototype?.[property];

    // Check if the property is invalid
    if (!prototypeProperty)
        throw new Error(PROPERTY_NOT_FOUND_ERROR + ": " + property);

    // Return the prototype property
    return prototypeProperty;
}

// NewDecorator creates a new decorator
export function NewDecorator(decoratorFn) {
    return (target, property) => {
        // Get the property prototype
        const prototypeProperty = GetPropertyPrototype(target, property);

        // Decorate the property
        return decoratorFn(target, property, prototypeProperty);
    }
}

// AddMetadata adds metadata to a method
export function AddMetadata(metadataKey, metadataValue) {
    return NewDecorator((target, property, prototypeProperty) => {
        // Check if the key is invalid
        if (!metadataKey)
            throw INVALID_METADATA_KEY_ERROR;

        if (!prototypeProperty?.[METADATA_KEY])
            prototypeProperty[METADATA_KEY] = {};

        else if (prototypeProperty[METADATA_KEY]?.[metadataKey])
            throw new Error(METADATA_KEY_ALREADY_EXISTS_ERROR + ": " + metadataKey);

        // Add the metadata to the method
        prototypeProperty[METADATA_KEY][metadataKey] = metadataValue
    });
}

// GetMetadata gets metadata from a method
export function GetMetadata(target, property) {
    // Get the property prototype
    const prototypeProperty = GetPropertyPrototype(target, property);

    return prototypeProperty?.[METADATA_KEY];
}

// GetMetadataKeys gets metadata keys from a method
export function GetMetadataKeys(target, property, ...keys) {
    // Get the property prototype
    const prototypeProperty = GetPropertyPrototype(target, property);

    // Check if the metadata is not found
    if (!prototypeProperty?.[METADATA_KEY])
            throw new Error(METADATA_NOT_FOUND_ERROR);

    // Create the metadata values array
    const metadata = {};

    // Iterate over the keys
    for (const key of keys) {
        // Check if the key is invalid
        if (!key)
            throw INVALID_METADATA_KEY_ERROR;

        if (!prototypeProperty[METADATA_KEY]?.[key])
            throw new Error(METADATA_KEY_NOT_FOUND_ERROR + ": " + key);

        // Add the metadata value to the array
        metadata[key] = prototypeProperty[METADATA_KEY][key];
    }

    // Return the metadata values
    return metadata;
}

// GetMetadataKey gets a metadata key from a method
export function GetMetadataKey(target, property, key) {
    // Get the metadata keys
    const values = GetMetadataKeys(target, property, key);

    // Return the metadata value
    return values[key];
}