// Errors that can be thrown in the code
export const INVALID_METADATA_KEY_ERROR = new Error("Invalid metadata key");
export const METADATA_KEY_ALREADY_EXISTS_ERROR = "Metadata key already exists"
export const METADATA_KEY_NOT_FOUND_ERROR = "Metadata key not found"
export const METADATA_NOT_FOUND_ERROR = "Metadata not found"

// NewDecorator creates a new decorator
export function NewDecorator(decoratorFn) {
    return descriptor => decoratorFn(descriptor);
}

// AddMetadata adds metadata to a method
export function AddMetadata(key, value) {
    return NewDecorator((descriptor) => {
        // Check if the key is invalid
        if (!key)
            throw INVALID_METADATA_KEY_ERROR;
        if (!descriptor.metadata)
            descriptor.metadata = {};
        else if (descriptor.metadata[key])
            throw new Error(METADATA_KEY_ALREADY_EXISTS_ERROR + ": " + key);

        // Add the metadata to the method
        descriptor.metadata[key] = value

        // Return the descriptor
        return descriptor;
    });
}

// GetMetadata gets metadata from a method
export function GetMetadata(descriptor) {
    return descriptor?.metadata;
}

// GetMetadataKeys gets metadata keys from a method
export function GetMetadataKeys(descriptor, ...keys) {
    // Create the metadata values array
    const metadata = {};

    // Iterate over the keys
    for (const key of keys) {
        // Check if the key is invalid
        if (!key)
            throw INVALID_METADATA_KEY_ERROR;
        if (descriptor?.metadata)
            throw new Error(METADATA_NOT_FOUND_ERROR);
        if (!descriptor.metadata?.[key])
            throw new Error(METADATA_KEY_NOT_FOUND_ERROR + ": " + key);

        // Add the metadata value to the array
        metadata[key] = descriptor.metadata[key];
    }

    // Return the metadata values
    return metadata;
}

// GetMetadataKey gets a metadata key from a method
export function GetMetadataKey(descriptor, key) {
    // Get the metadata keys
    const values = GetMetadataKeys(descriptor, key);

    // Return the metadata value
    return values[key];
}


// Get the descriptor of a property
export function GetDescriptor(classObject, property) {
    return Object.getOwnPropertyDescriptor(classObject?.prototype, property);
}

// Decorate decorates a method with the given decorator
export default function Decorate(classObject, property, decoratorFn) {
    const descriptor = GetDescriptor(classObject, property);
    Object.defineProperty(classObject?.prototype, property, decoratorFn(descriptor));
}