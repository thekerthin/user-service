import { ApiModelPropertyOptional, ApiResponse, ResponseMetadata } from '@nestjs/swagger';

export function ApiPaginationResponseCustom(
  metadata: { status: number; type: any } & ResponseMetadata
) {
  class Meta {
    @ApiModelPropertyOptional()
    count: number;

    @ApiModelPropertyOptional()
    totalPages: number;

    @ApiModelPropertyOptional()
    page: number;

    @ApiModelPropertyOptional()
    limit: number;
  }

  class PaginationResponseDto {
    @ApiModelPropertyOptional({ type: [metadata.type] })
    data: any[];

    @ApiModelPropertyOptional({ type: Meta })
    meta: Meta;
  }

  Object.defineProperty(PaginationResponseDto, 'name', { value: `PaginationResponse${metadata.type.name}` });

  metadata.type = PaginationResponseDto;

  const _decorator = ApiResponse(metadata);

  return function (target, key?, descriptor?: PropertyDescriptor) {
    return _decorator(target, key, descriptor);
  }
}
