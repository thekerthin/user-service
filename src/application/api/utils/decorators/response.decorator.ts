import { ApiModelPropertyOptional, ApiResponse, ResponseMetadata } from '@nestjs/swagger';

export function ApiResponseCustom(
  metadata: { status: number; type: any } & ResponseMetadata
) {
  class ResponseDto {
    @ApiModelPropertyOptional({ type: metadata.type })
    data: any;
  }

  Object.defineProperty(ResponseDto, 'name', { value: `Response${metadata.type.name}` });

  metadata.type = ResponseDto;

  const _decorator = ApiResponse(metadata);

  return function (target, key?, descriptor?: PropertyDescriptor) {
    return _decorator(target, key, descriptor);
  }
}
